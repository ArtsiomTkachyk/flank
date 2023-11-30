export default {
    "examples": {},
    "headers": {},
    "parameters": {},
    "requestBodies": {},
    "responses": {},
    "securitySchemes": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Enter the token with the `Bearer: ` prefix, e.g. \"Bearer ey234sa...\"."
        }
    },
    "schemas": {
        "LoginRequestBody": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            },
            "required": ["email", "password"],
        },
        "LoginSuccessResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "object",
                    "properties": {
                        "auth_token": {
                            "type": "string",
                            default: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpc"
                        },
                        "first_name": {
                            "type": "string",
                            default: "John"
                        },
                        "last_name": {
                            "type": "string",
                            default: "Doe"
                        }
                    },
                },
                "errors": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {},
                        "default": {}
                    },
                    "default": []
                },
                "pagination": {
                    "type": "object",
                    "default": null
                },
                "success": {
                    "type": "boolean"
                }
            }
        },
        "LoginInvalidResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "object",
                    "properties": {},
                    default: null
                },
                
                "success": {
                    "type": "boolean",
                    default: false
                },
                "errors": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "code": {
                                type: "string",
                                default: "BAD_REQUEST_ERROR"
                            },
                            "message": {
                                type: "string",
                                default: "Email or password is incorrect"
                            },
                            "additionalInfo": {
                                type: "array",
                                items: [],
                                default: [],
                            }
                        }
                    }
                },
                "pagination": {
                    "type": "object",
                    "properties": {},
                    default: null
                }
            }
        }
    }
}