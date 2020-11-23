import {
  useEffect, useState, createContext, useContext,
} from 'react';

import firebase from '@/utils/firebase';
import useFirestore from './useFirestore';
import { useError } from './useSnackbar';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const { setError, setSuccess } = useError();

  const { getDocument, saveDocument } = useFirestore();

  useEffect(() => {
    let unsubscribeProfile = () => { };
    const unsubscribe = firebase.auth()
      .onAuthStateChanged(async (user) => {
        if (loadingAuth) {
          setLoadingAuth(false);
        } else {
          setLoadingAuth(true);
        }

        setAuthUser(user);
        if (user) {
          unsubscribeProfile = getDocument(`users/${user.uid}`, async (data) => {
            setProfile({ ...data, id: user.uid });
          });
        } else {
          unsubscribeProfile();
          setProfile(null);
        }
      });
    return () => {
      unsubscribeProfile();
      unsubscribe();
    };
  }, []);

  const loginWithEmail = (email, password, callback, error) => firebase.auth()
    .signInWithEmailAndPassword(email, password).then(async () => {
      setSuccess('Welcome! You have successfully logged in.');
      callback();
    }).catch((err) => {
      error();
      if (err.message === 'The user account has been disabled by an administrator.') {
        setError('The system is still processing your account. Please try again after a few seconds!');
      } else {
        setError(err.message);
      }
    });

  const updateProfile = (document) => firebase.firestore()
    .doc(`users/${firebase.auth().currentUser.uid}`)
    .update(document);

  const registerEmail = (email, password, username, callback, error) => firebase.auth()
    .createUserWithEmailAndPassword(email, password).then(async () => {
      callback();
      await Promise.all([
        firebase.auth().currentUser.sendEmailVerification(),
        saveDocument(`users/${firebase.auth().currentUser.uid}`, {
          username,
          displayName: username,
        }),
      ]);
      setSuccess('Registration success! Email verification is required to interact with the community.');
    }).catch((err) => {
      error();
      setError(err.message);
    });

  const loginWithFacebook = () => firebase.auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(async (result) => {
      if (result.additionalUserInfo.isNewUser) {
        await firebase.auth().signOut();
        setError('This Facebook account has not been connected to any Atenews account yet!');
        setProfile(null);
      } else {
        setSuccess('Welcome! You have successfully logged in.');
        await saveDocument(`users/${firebase.auth().currentUser.uid}`, {
          facebookUsername: result.additionalUserInfo.profile.name,
        });
      }
    }).catch((err) => {
      setError(err.message);
    });

  const connectWithFacebook = () => firebase.auth()
    .currentUser.linkWithPopup(new firebase.auth.FacebookAuthProvider()).then(async (result) => {
      await saveDocument(`users/${firebase.auth().currentUser.uid}`, {
        facebookUsername: result.additionalUserInfo.profile.name,
      });
    }).catch((err) => {
      setError(err.message);
    });

  const loginWithTwitter = () => firebase.auth()
    .signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(async (result) => {
      if (result.additionalUserInfo.isNewUser) {
        await firebase.auth().signOut();
        setError('This Twitter account has not been connected to any Atenews account yet!');
        setProfile(null);
      } else {
        await saveDocument(`users/${firebase.auth().currentUser.uid}`, {
          twitterUsername: result.additionalUserInfo.username,
        });
        setSuccess('Welcome! You have successfully logged in.');
      }
    }).catch((err) => {
      setError(err.message);
    });

  const connectWithTwitter = () => firebase.auth()
    .currentUser.linkWithPopup(new firebase.auth.TwitterAuthProvider()).then(async (result) => {
      await saveDocument(`users/${firebase.auth().currentUser.uid}`, {
        twitterUsername: result.additionalUserInfo.username,
      });
    }).catch((err) => {
      setError(err.message);
    });

  const logout = () => firebase.auth().signOut().then(() => {
    setProfile(null);
  }).catch((err) => {
    setError(err.message);
  });

  const deleteAccount = () => firebase.auth().currentUser.delete().then(async () => {
    await firebase.auth().signOut();
  }).catch((err) => {
    setError(err.message);
  });

  return (
    <AuthContext.Provider value={{
      loginWithEmail,
      registerEmail,
      loginWithFacebook,
      connectWithFacebook,
      loginWithTwitter,
      connectWithTwitter,
      updateProfile,
      authUser,
      profile,
      logout,
      loadingAuth,
      deleteAccount,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
