// src/handlers/auth.rs
use actix_web::{web, HttpResponse, Responder, http::StatusCode};
use mongodb::{Client, Collection, bson::{doc, oid::ObjectId}};
use serde::{Deserialize, Serialize};

use crate::models::user::{User, PublicUser};
use crate::utils::{password, jwt};

// --- Helper Structs for Requests/Responses ---

#[derive(Deserialize)]
pub struct SignupRequest {
    name: String,
    email: String,
    password: String,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Deserialize)]
pub struct GoogleRequest {
    credential: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    token: String,
    user: PublicUser,
}

#[derive(Serialize)]
struct ErrorResponse {
    message: String,
}

// Helper to get the user collection from the DB
fn get_user_collection(client: &web::Data<Client>) -> Collection<User> {
    client.database("yetta_db").collection("users")
}

// --- Route Handlers ---

/// POST /api/auth/signup
pub async fn signup(client: web::Data<Client>, req: web::Json<SignupRequest>) -> impl Responder {
    let users_collection = get_user_collection(&client);
    
    // 1. Check if user already exists
    match users_collection.find_one(doc! { "email": &req.email }, None).await {
        Ok(Some(_)) => {
            return HttpResponse::Conflict().json(ErrorResponse { 
                message: "Email already exists".to_string() 
            });
        },
        Ok(None) => (), // Email is available
        Err(e) => {
            log::error!("Database error: {}", e);
            return HttpResponse::InternalServerError().json(ErrorResponse { message: "Database error".to_string() });
        }
    }
    
    // 2. Hash the password
    let password_hash = match password::hash_password(&req.password) {
        Ok(hash) => hash,
        Err(e) => {
            log::error!("Password hashing error: {}", e);
            return HttpResponse::InternalServerError().json(ErrorResponse { message: "Failed to create account".to_string() });
        }
    };
    
    // 3. Create new user
    let new_user = User {
        id: Some(ObjectId::new()),
        name: req.name.clone(),
        email: req.email.clone(),
        password_hash: Some(password_hash),
        google_id: None,
    };
    
    // 4. Insert into database
    if let Err(e) = users_collection.insert_one(&new_user, None).await {
        log::error!("Database insert error: {}", e);
        return HttpResponse::InternalServerError().json(ErrorResponse { message: "Failed to save user".to_string() });
    }
    
    // 5. Create JWT
    let token = match jwt::create_token(&new_user.email, &new_user.name) {
        Ok(token) => token,
        Err(e) => {
            log::error!("JWT creation error: {}", e);
            return HttpResponse::InternalServerError().json(ErrorResponse { message: "Failed to create session".to_string() });
        }
    };
    
    // 6. Send response
    HttpResponse::Ok().json(AuthResponse {
        token,
        user: new_user.into(),
    })
}

/// POST /api/auth/login
pub async fn login(client: web::Data<Client>, req: web::Json<LoginRequest>) -> impl Responder {
    let users_collection = get_user_collection(&client);

    // 1. Find user by email
    let user = match users_collection.find_one(doc! { "email": &req.email }, None).await {
        Ok(Some(user)) => user,
        Ok(None) => {
            return HttpResponse::Unauthorized().json(ErrorResponse { message: "Invalid email or password".to_string() });
        },
        Err(e) => {
            log::error!("Database error: {}", e);
            return HttpResponse::InternalServerError().json(ErrorResponse { message: "Database error".to_string() });
        }
    };

    // 2. Check if user has a password (they might be a Google user)
    let hash = match user.password_hash.as_ref() {
        Some(hash) => hash,
        None => {
            return HttpResponse::Unauthorized().json(ErrorResponse { message: "Please log in with Google".to_string() });
        }
    };
    
    // 3. Verify password
    match password::verify_password(hash, &req.password) {
        Ok(true) => {
            // 4. Create JWT
            let token = match jwt::create_token(&user.email, &user.name) {
                Ok(token) => token,
                Err(e) => {
                    log::error!("JWT creation error: {}", e);
                    return HttpResponse::InternalServerError().json(ErrorResponse { message: "Failed to create session".to_string() });
                }
            };
            
            // 5. Send response
            HttpResponse::Ok().json(AuthResponse {
                token,
                user: user.into(),
            })
        },
        _ => {
            HttpResponse::Unauthorized().json(ErrorResponse { message: "Invalid email or password".to_string() })
        }
    }
}

/// POST /api/auth/google
pub async fn verify_google_token(client: web::Data<Client>, req: web::Json<GoogleRequest>) -> impl Responder {
    // In a real application, you would use a crate like `google-auth`
    // to verify the req.credential (Google's JWT) against Google's servers.
    
    // --- START MOCK LOGIC ---
    // This logic simulates a successful Google verification
    log::debug!("Simulating Google token verification for: {}", req.credential);
    let mock_email = "google_user@gmail.com";
    let mock_name = "Google User";
    let mock_google_id = "mock_google_id_12345";
    // --- END MOCK LOGIC ---

    // 1. Find or create user in database
    let users_collection = get_user_collection(&client);
    let user = match users_collection.find_one(doc! { "google_id": mock_google_id }, None).await {
        Ok(Some(user)) => user, // User already exists
        Ok(None) => {
            // User does not exist, create them
            log::info!("Creating new Google user: {}", mock_email);
            let new_user = User {
                id: Some(ObjectId::new()),
                name: mock_name.to_string(),
                email: mock_email.to_string(),
                password_hash: None, // No password for Google users
                google_id: Some(mock_google_id.to_string()),
            };
            
            if let Err(e) = users_collection.insert_one(&new_user, None).await {
                log::error!("Database insert error: {}", e);
                return HttpResponse::InternalServerError().json(ErrorResponse { message: "Failed to save Google user".to_string() });
            }
            new_user
        },
        Err(e) => {
            log::error!("Database error: {}", e);
            return HttpResponse::InternalServerError().json(ErrorResponse { message: "Database error".to_string() });
        }
    };
    
    // 2. Create your app's JWT
    let token = match jwt::create_token(&user.email, &user.name) {
        Ok(token) => token,
        Err(e) => {
            log::error!("JWT creation error: {}", e);
            return HttpResponse::InternalServerError().json(ErrorResponse { message: "Failed to create session".fBString() });
        }
    };
    
    // 3. Send response
    HttpResponse::Ok().json(AuthResponse {
        token,
        user: user.into(),
    })
}