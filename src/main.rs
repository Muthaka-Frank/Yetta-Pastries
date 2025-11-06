// src/main.rs
use actix_cors::Cors;
use actix_web::{web, App, HttpServer, middleware::Logger};
use mongodb::Client;
use std::env;
use dotenv::dotenv;

// Import modules
mod db;
mod handlers;
mod models;
mod utils;

// Import route handlers
use handlers::auth::{login, signup, verify_google_token};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load environment variables from .env file
    dotenv().ok();
    
    // Initialize logger
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // Get server address from .env
    let server_addr = env::var("SERVER_ADDR").unwrap_or_else(|_| "127.0.0.1:8080".to_string());

    // Connect to MongoDB
    let mongo_client = db::init_db().await.expect("Failed to connect to MongoDB.");
    log::info!("Successfully connected to MongoDB");

    log::info!("Starting server at http://{}", server_addr);

    HttpServer::new(move || {
        // Configure CORS to allow requests from your React app
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173") // Your React app's address
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec!["Content-Type", "Authorization"])
            .max_age(3600);

        App::new()
            // 1. Pass the MongoDB client to all handlers
            .app_data(web::Data::new(mongo_client.clone()))
            // 2. Enable CORS
            .wrap(cors)
            // 3. Enable Logger
            .wrap(Logger::default())
            // 4. Define API routes
            .service(
                web::scope("/api/auth") // Base path for auth
                    .route("/signup", web::post().to(signup))
                    .route("/login", web::post().to(login))
                    .route("/google", web::post().to(verify_google_token))
            )
    })
    .bind(&server_addr)?
    .run()
    .await
}