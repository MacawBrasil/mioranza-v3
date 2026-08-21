#!/bin/sh
set -e

# O volume persistente (/app/media) é montado pelo Coolify e o dono dele é
# resetado a cada deploy. Como o container inicia como root, aqui garantimos
# que o diretório exista e pertença ao usuário de runtime antes de subir o
# servidor. Em seguida baixamos o privilégio para 'nextjs'.
mkdir -p /app/media
chown -R nextjs:nodejs /app/media

exec su-exec nextjs "$@"
