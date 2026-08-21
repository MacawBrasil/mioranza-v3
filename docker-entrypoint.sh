#!/bin/sh
set -e

# O volume persistente (/app/media) é montado pelo Coolify e o dono dele pode
# ser resetado a cada deploy. Como o container inicia como root, garantimos que
# o diretório exista e pertença ao usuário de runtime (node, uid 1000) antes de
# subir o servidor. Em seguida baixamos o privilégio para 'node'.
#
# O `|| true` evita que uma eventual falha de chown derrube o container: como o
# app roda com uid 1000 (mesmo dono que o Coolify usa no host), o acesso já
# funciona mesmo sem o chown.
mkdir -p /app/media
chown -R node:node /app/media || true

exec su-exec node "$@"
