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

export type JsonLdSchema = {
  '@context': {
    '@protected': boolean
    '@version': number
    id: string
    type: string
  } & {
    [key: string]: {
      '@context': {
        '@propagate': boolean
        '@protected': boolean
        'polygon-vocab': string
        xsd: string
        groupID: {
          '@id': string
          '@type': string
        }
      } & {
        [key: string]: {
          '@id': string
          '@type': string
        }
      }
      '@id': string
    }
  }[]
}

export type CredentialSubject = {
  id: string
  type: string
  groupID: string // uuid
} & Record<string, string>

export type ParsedCredentialSchemaProperty = { key: string; type: string; value: string }

export type ParsedCredentialSchema = {
  type: string
  credSubjectProperties: ParsedCredentialSchemaProperty[]
}

export type IssuerDetails = {
  did: string
  name: string
}
