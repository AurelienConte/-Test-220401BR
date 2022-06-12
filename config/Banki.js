//These credentials are only for testing, use a properly configured .env to store them !

module.exports = {
  user: process.env.BANKI_USER || 'BankinUser',
  password: process.env.BANKI_PASSWORD || '12345678',
  clientId: process.env.BANKI_CLIENT_ID || 'BankinClientId',
  clientSecret: process.env.BANKI_CLIENT_SECRET || 'secret',
  baseUrl: process.env.BANKI_BANKI_BASE_URL || 'http://localhost:3000',
}