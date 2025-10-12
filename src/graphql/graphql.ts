/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  GeoPoint: { input: { latitude: number, longitude: number }; output: { latitude: number, longitude: number }; }
  Integer: { input: number; output: number; }
  URI: { input: string; output: string; }
};

export type AttributesInput = {
  readonly createdAt: InputMaybe<Scalars['Date']['input']>;
  readonly description: InputMaybe<Scalars['String']['input']>;
  readonly location: InputMaybe<LocationInput>;
};

export type Blob = Node & {
  readonly __typename?: 'Blob';
  /** Only available when contentType of the blob is 'image/*'. */
  readonly asImage: Maybe<Image>;
  /** Only available when the contentType of the Blob is 'video/*'. */
  readonly asVideo: Maybe<Video>;
  readonly contentType: Scalars['String']['output'];
  /** Time when the blob was created (eg. image taken). */
  readonly createdAt: Maybe<Scalars['Date']['output']>;
  readonly description: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly location: Maybe<Location>;
  /** Blob names are 256 bit random numbers encoded in Base58. */
  readonly name: Scalars['String']['output'];
  /**
   * Time when the blob was published on the platform. Is always later than the
   * 'createdAt' timestamp.
   */
  readonly publishedAt: Maybe<Scalars['Date']['output']>;
  /** The size of the blob. */
  readonly size: Scalars['Integer']['output'];
  /** Absolute URL to the raw blob. */
  readonly url: Scalars['URI']['output'];
};

export type BlobConnection = {
  readonly __typename?: 'BlobConnection';
  readonly edges: ReadonlyArray<BlobEdge>;
  readonly pageInfo: Maybe<PageInfo>;
  readonly totalCount: Scalars['Int']['output'];
};

export type BlobEdge = {
  readonly __typename?: 'BlobEdge';
  readonly cursor: Scalars['String']['output'];
  readonly node: Blob;
};

export type BlobOrder = {
  readonly direction: InputMaybe<OrderDirection>;
  readonly field: InputMaybe<BlobOrderField>;
};

export type BlobOrderField =
  | 'CREATED_AT'
  | 'NAME';

export type Collection = Node & {
  readonly __typename?: 'Collection';
  readonly blobs: BlobConnection;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly slug: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
};


export type CollectionBlobsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
};

export type Dimensions = {
  readonly __typename?: 'Dimensions';
  readonly height: Scalars['Int']['output'];
  readonly width: Scalars['Int']['output'];
};

export type Image = Node & {
  readonly __typename?: 'Image';
  readonly dimensions: Dimensions;
  readonly id: Scalars['ID']['output'];
  /** A lower quality placeholder image. */
  readonly placeholder: Image;
  readonly url: Scalars['URI']['output'];
};


export type ImagePlaceholderArgs = {
  q: InputMaybe<Scalars['Int']['input']>;
  variant: InputMaybe<ImagePlaceholderVariant>;
};

export type ImagePlaceholderVariant =
  | 'PNG'
  | 'SQIP'
  | 'WEBP';

export type Location = {
  readonly __typename?: 'Location';
  readonly id: Scalars['ID']['output'];
  readonly label: Maybe<Scalars['String']['output']>;
  readonly point: Maybe<Scalars['GeoPoint']['output']>;
};

export type LocationInput = {
  readonly label: InputMaybe<Scalars['String']['input']>;
  readonly point: InputMaybe<Scalars['GeoPoint']['input']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly delete: Scalars['Boolean']['output'];
  readonly purgeCache: Scalars['Boolean']['output'];
  readonly writeAttributes: Maybe<Node>;
};


export type MutationDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPurgeCacheArgs = {
  id: Scalars['ID']['input'];
};


export type MutationWriteAttributesArgs = {
  id: Scalars['ID']['input'];
  input: InputMaybe<AttributesInput>;
};

export type Node = {
  readonly id: Scalars['ID']['output'];
};

export type OrderDirection =
  | 'ASC'
  | 'DESC';

export type PageInfo = {
  readonly __typename?: 'PageInfo';
  readonly endCursor: Maybe<Scalars['String']['output']>;
  readonly hasNextPage: Maybe<Scalars['Boolean']['output']>;
  readonly hasPreviousPage: Maybe<Scalars['Boolean']['output']>;
  readonly startCursor: Maybe<Scalars['String']['output']>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly blob: Maybe<Blob>;
  readonly blobs: BlobConnection;
  readonly collection: Maybe<Collection>;
  /**
   * Generates a new name – a base58 encoded bitstring.
   *
   * The number of bits is rounded up to the next multiple of 8.
   *
   * XXX: This likely should be a Mutation, since the result is not cacheable!
   */
  readonly name: Maybe<Scalars['String']['output']>;
  readonly node: Maybe<Node>;
};


export type QueryBlobArgs = {
  name: Scalars['String']['input'];
};


export type QueryBlobsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<BlobOrder>;
};


export type QueryCollectionArgs = {
  name: Scalars['String']['input'];
};


export type QueryNameArgs = {
  bits: Scalars['Int']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};

export type Rendition = Node & {
  readonly __typename?: 'Rendition';
  readonly dimensions: Dimensions;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly url: Scalars['URI']['output'];
};

export type Video = Node & {
  readonly __typename?: 'Video';
  readonly dimensions: Dimensions;
  readonly id: Scalars['ID']['output'];
  readonly poster: Image;
  readonly renditions: ReadonlyArray<Rendition>;
  readonly url: Scalars['URI']['output'];
};

export type BlockQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type BlockQuery = { readonly __typename?: 'Query', readonly blob: { readonly __typename?: 'Blob', readonly name: string, readonly asImage: { readonly __typename?: 'Image', readonly url: string, readonly dimensions: { readonly __typename?: 'Dimensions', readonly width: number, readonly height: number }, readonly placeholder: { readonly __typename?: 'Image', readonly url: string } } | null, readonly asVideo: { readonly __typename?: 'Video', readonly poster: { readonly __typename?: 'Image', readonly url: string, readonly dimensions: { readonly __typename?: 'Dimensions', readonly width: number, readonly height: number }, readonly placeholder: { readonly __typename?: 'Image', readonly url: string } }, readonly renditions: ReadonlyArray<{ readonly __typename?: 'Rendition', readonly url: string, readonly dimensions: { readonly __typename?: 'Dimensions', readonly width: number, readonly height: number } }> } | null } | null };

export type BlobQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type BlobQuery = { readonly __typename?: 'Query', readonly blob: { readonly __typename?: 'Blob', readonly id: string, readonly name: string, readonly asImage: { readonly __typename?: 'Image', readonly url: string, readonly dimensions: { readonly __typename?: 'Dimensions', readonly width: number, readonly height: number }, readonly placeholder: { readonly __typename?: 'Image', readonly url: string } } | null, readonly asVideo: { readonly __typename?: 'Video', readonly poster: { readonly __typename?: 'Image', readonly url: string, readonly dimensions: { readonly __typename?: 'Dimensions', readonly width: number, readonly height: number }, readonly placeholder: { readonly __typename?: 'Image', readonly url: string } }, readonly renditions: ReadonlyArray<{ readonly __typename?: 'Rendition', readonly url: string, readonly dimensions: { readonly __typename?: 'Dimensions', readonly width: number, readonly height: number } }> } | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const BlockDocument = new TypedDocumentString(`
    query Block($name: String!) {
  blob(name: $name) {
    name
    asImage {
      url
      dimensions {
        width
        height
      }
      placeholder {
        url
      }
    }
    asVideo {
      poster {
        url
        dimensions {
          width
          height
        }
        placeholder {
          url
        }
      }
      renditions {
        url
        dimensions {
          width
          height
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<BlockQuery, BlockQueryVariables>;
export const BlobDocument = new TypedDocumentString(`
    query Blob($name: String!) {
  blob(name: $name) {
    id
    name
    asImage {
      url
      dimensions {
        width
        height
      }
      placeholder {
        url
      }
    }
    asVideo {
      poster {
        url
        dimensions {
          width
          height
        }
        placeholder {
          url
        }
      }
      renditions {
        url
        dimensions {
          width
          height
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<BlobQuery, BlobQueryVariables>;