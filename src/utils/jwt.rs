// src/utils/jwt.rs
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
use chrono::{Utc, Duration};
use serde::{Serialize, Deserialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // Subject (user email)
    pub exp: i64,    // Expiration time
    pub name: String,
}

// Get the JWT secret from .env
fn get_jwt_secret() -> String {
    env::var("JWT_SECRET").expect("JWT_SECRET must be set in .env file")
}

// Create a new JWT
pub fn create_token(email: &str, name: &str) -> Result<String, jsonwebtoken::errors::Error> {
    let expiration = Utc::now()
        .checked_add_signed(Duration::days(7)) // Token is valid for 7 days
        .expect("Failed to create expiration")
        .timestamp();

    let claims = Claims {
        sub: email.to_owned(),
        exp: expiration,
        name: name.to_owned(),
    };

    let header = Header::new(Algorithm::HS256);
    let key = EncodingKey::from_secret(get_jwt_secret().as_ref());
    
    encode(&header, &claims, &key)
}

// Note: You would also add a 'decode_token' function here for verifying tokens
// on protected routes, but it's not needed for the auth handlers themselves.