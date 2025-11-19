/**
 * Environment Variable Validation Utility
 * 
 * Validates that all required environment variables are set
 * and provides helpful error messages for missing variables.
 */

type EnvConfig = {
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
  };
  resend: {
    apiKey?: string;
    fromEmail?: string;
  };
  contact: {
    email?: string;
    phone?: string;
  };
  maps: {
    apiKey?: string;
  };
  analytics: {
    gaId?: string;
  };
};

const requiredEnvVars = {
  supabase: {
    url: "NEXT_PUBLIC_SUPABASE_URL",
    anonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  },
} as const;

const optionalEnvVars = {
  supabase: {
    serviceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
  },
  resend: {
    apiKey: "RESEND_API_KEY",
    fromEmail: "RESEND_FROM_EMAIL",
  },
  contact: {
    email: "NEXT_PUBLIC_CONTACT_EMAIL",
    phone: "NEXT_PUBLIC_CONTACT_PHONE",
  },
  maps: {
    apiKey: "NEXT_PUBLIC_MAPS_API_KEY",
  },
  analytics: {
    gaId: "NEXT_PUBLIC_GA_ID",
  },
} as const;

export function validateEnv(): EnvConfig {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate required variables
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    errors.push(`Missing required variable: ${requiredEnvVars.supabase.url}`);
  }

  if (!supabaseAnonKey) {
    errors.push(`Missing required variable: ${requiredEnvVars.supabase.anonKey}`);
  }

  // Check optional variables
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceKey) {
    warnings.push(
      `Optional variable not set: ${optionalEnvVars.supabase.serviceRoleKey} (needed for admin operations)`
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    warnings.push(
      `Optional variable not set: ${optionalEnvVars.resend.apiKey} (email notifications will be disabled)`
    );
  }

  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendFromEmail && resendApiKey) {
    warnings.push(
      `Optional variable not set: ${optionalEnvVars.resend.fromEmail} (required if RESEND_API_KEY is set)`
    );
  }

  const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  if (!mapsApiKey) {
    warnings.push(
      `Optional variable not set: ${optionalEnvVars.maps.apiKey} (map features will be disabled)`
    );
  }

  // Throw error if required variables are missing
  if (errors.length > 0) {
    const errorMessage = [
      "❌ Missing required environment variables:",
      ...errors.map((err) => `   - ${err}`),
      "",
      "Please set these variables in your .env.local file.",
      "See .env.example for reference.",
    ].join("\n");

    throw new Error(errorMessage);
  }

  // Log warnings in development
  if (warnings.length > 0 && process.env.NODE_ENV === "development") {
    console.warn(
      [
        "⚠️  Environment variable warnings:",
        ...warnings.map((warn) => `   - ${warn}`),
      ].join("\n")
    );
  }

  return {
    supabase: {
      url: supabaseUrl!,
      anonKey: supabaseAnonKey!,
      serviceRoleKey: supabaseServiceKey,
    },
    resend: {
      apiKey: resendApiKey,
      fromEmail: resendFromEmail,
    },
    contact: {
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      phone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
    },
    maps: {
      apiKey: mapsApiKey,
    },
    analytics: {
      gaId: process.env.NEXT_PUBLIC_GA_ID,
    },
  };
}

/**
 * Get validated environment configuration
 * Throws error if required variables are missing
 */
export function getEnv(): EnvConfig {
  return validateEnv();
}

/**
 * Check if environment is properly configured
 * Returns true if all required variables are set
 */
export function isEnvConfigured(): boolean {
  try {
    validateEnv();
    return true;
  } catch {
    return false;
  }
}

