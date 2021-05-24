# Self Signed Certificate

## Action Mode

### Steps

- Generate a pair of
  - Private Key
  - A public certificate signing request

```bash
openssl req -nodes -newkey rsa:2048 -keyout myserver.key -out server.csr
```

- `req` for request
- `-x509` is the format of the certificate
- `-days` you would want your certificate for

## Reader Mode

### Reading Material

- This is also called _CSR(Certificate Signing Request) Generation using SSL_ i.e. you're generating a certificate signing request using OpenSSL
- A CSR file cotnains the following
  - Certificate Application Information
  - Public Key
