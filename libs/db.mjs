/*
 * @license
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
// import { store } from '../config.js';

/**
 * User data schema
 * {
 *   id: string Base64URL encoded user ID,
 *   username: string username,
 *   displayName: string display name,
 * }
 **/

const credentials = new Map();
const users = new Map();

export const Users = {
  findById: async (user_id) => {
    const user = users.get(user_id);
    if (user) {
      return user;
    }
    /*
    const doc = await store.collection('users').doc(user_id).get();
    if (doc) {
      const credential = doc.data();
      return credential;
    } else {
      return;
    }
    */
  },

  findByUsername: async (username) => {
    const results = [];
    users.forEach((user) => {
      if (user.username == username) {
        results.push(user);
      }
    });
    return results.length > 0 ? results[0] : undefined;

    /*
    const results = [];
    const refs = await store.collection('users')
      .where('username', '==', username).get();
    if (refs) {
      refs.forEach(user => results.push(user.data()));
    }
    return results.length > 0 ? results[0] : undefined;
    */
  },

  update: async (user) => {
    users.set(user.id, user);
    
    /*
    const ref = store.collection('users').doc(user.id);
    return ref.set(user);
    */
  }
}

/**
 * User data schema
 * {
 *   id: string Base64URL encoded CredentialID,
 *   publicKey: string Base64URL encoded PublicKey,
 *   name: string name of the credential,
 *   transports: an array of transports,
 *   registered: timestamp,
 *   last_used: timestamp,
 *   user_id: string Base64URL encoded user ID of the owner,
 * }
 **/

export const Credentials = {
  findById: async (credential_id) => {
    const credential = credentials.get(credential_id);
    if (credential) {
      return credential;
    }
    /*
    const doc = await store.collection('credentials').doc(credential_id).get();
    if (doc) {
      const credential = doc.data();
      return credential;
    } else {
      return;
    }
    */
  },

  findByUserId: async (user_id) => {
    const results = [];
    credentials.forEach((credential) => {
      if (credential.user_id === user_id) {
        results.push(credential);
      }
    });
    return results;
    /*
    const results = [];
    const refs = await store.collection('credentials')
      .where('user_id', '==', user_id)
      .orderBy('registered', 'desc').get();
    refs.forEach(cred => results.push(cred.data()));
    return results;
    */
  },

  update: async (credential) => {
    credentials.set(credential.id, credential);

    /*
    const ref = store.collection('credentials').doc(credential.id);
    return ref.set(credential);
    */
  },
  
  remove: async (credential_id) => {
    credentials.delete(credential.id);
    /*
    const ref = store.collection('credentials').doc(credential_id);
    return ref.delete();
    */
  }
}
