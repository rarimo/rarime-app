// TODO: move to rarime-connector
export type VCSchema = {
  $schema: string
  type: string
  $metadata: {
    uris: {
      jsonLdContext: string
      jsonSchema: string
    }
  }
  required: Array<string>
  properties: {
    '@context': {
      type: Array<string>
    }
    id: {
      type: string
    }
    type: {
      type: Array<string>
      items: {
        type: string
      }
    }
    issuer: {
      type: Array<string>
      format: string
      required: Array<string>
      properties: {
        id: {
          type: string
          format: string
        }
      }
    }
    issuanceDate: {
      type: string
      format: string
    }
    expirationDate: {
      type: string
      format: string
    }
    credentialSchema: {
      type: string
      required: Array<string>
      properties: {
        id: {
          type: string
          format: string
        }
        type: {
          type: string
        }
      }
    }
    subjectPosition: {
      type: string
      enum: Array<string>
    }
    merklizationRootPosition: {
      type: string
      enum: Array<string>
    }
    revNonce: {
      type: string
    }
    version: {
      type: string
    }
    updatable: {
      type: string
    }
    credentialSubject: {
      type: string
      required: Array<string>
      properties: {
        id: {
          title: string
          type: string
          format: string
        }
      } & {
        [key: string]: {
          type: string
        }
      }
    }
  }
}

export type CredentialSubject = Record<string, string> & {
  metadata_id: string
}

export type { SaveCredentialsRequestParams, ZKProof } from '@rarimo/rarime-connector'
