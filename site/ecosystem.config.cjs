module.exports = {
  apps : [
      {
        name: "ton-safe-site",
        script: "./server.js",
        env: {
          "NODE_ENV": "production",
        }
      }
  ]
}
