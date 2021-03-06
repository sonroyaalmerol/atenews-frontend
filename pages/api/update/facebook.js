import admin from '@/utils/firebaseAdmin';
import fetch from 'node-fetch';

export default async (req, res) => {
  const accessToken = (await admin.firestore().collection('keys').doc('facebook').get()).data().accessToken;
  const appId = process.env.NEXT_PUBLIC_FB_APP_ID;
  const appSecret = process.env.NEXT_PUBLIC_FB_APP_SECRET;

  const response = await fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${accessToken}`);
  const data = await response.json()
  await admin.firestore().collection('keys').doc('facebook').update({
    accessToken: data.access_token,
  });

  res.status(200).send(true);
}