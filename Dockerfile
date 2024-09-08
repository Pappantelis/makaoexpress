#Χρησιμοποιούμε την επίσημη εικόνα του Node.js
FROM node:14

#Ορίζουμε το working directory
WORKDIR /app

#Αντιγράφουμε το package.json και το package-lock.json (αν υπάρχει)
COPY package*.json ./

#Εγκαθιστούμε τα dependencies
RUN npm install

#Αντιγράφουμε τον υπόλοιπο κώδικα της εφαρμογής
COPY . .

#Εκθέτουμε την πόρτα στην οποία τρέχει ο server
EXPOSE 4000

#Εκκίνηση της εφαρμογής
CMD ["npm", "start"]