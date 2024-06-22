import { getAnalytics } from 'firebase/analytics'
import * as firebase from 'firebase/app'

console.log('Initialized Firebase Client')

if (!firebase.getApps().length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyCh0rcU5eVR7oNWTKe-1pn5yJ_MOES0q8c',
    authDomain: 'nzgda-archive.firebaseapp.com',
    projectId: 'nzgda-archive',
    storageBucket: 'nzgda-archive.appspot.com',
    messagingSenderId: '319594268552',
    appId: '1:319594268552:web:df583f7af597bd101a5c3d',
    measurementId: 'G-Y7J7NJ1M52',
  }

  const app = firebase.initializeApp(firebaseConfig)
  if (typeof window !== 'undefined') {
    getAnalytics(app)
  }
}
