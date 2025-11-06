// src/models/user.rs
use serde::{Serialize, Deserialize};
use mongodb::bson::oid::ObjectId;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>, // MongoDB's unique ID
    pub name: String,
    pub email: String,
    
    #[serde(skip_serializing)] // Never send the password hash to the client
    pub password_hash: Option<String>, // Optional because Google users won't have one
    
    #[serde(skip_serializing_if = "Option::is_none")]
    pub google_id: Option<String>, // For Google-authenticated users
}

// Model for sending user data back to the client (without sensitive info)
#[derive(Serialize, Deserialize, Debug)]
pub struct PublicUser {
    pub name: String,
    pub email: String,
}

impl From<User> for PublicUser {
    fn from(user: User) -> Self {
        PublicUser {
            name: user.name,
            email: user.email,
        }
    }
}