if [ -z "$1" ]; then
  echo "Enter the package to debug!"
  exit
fi

PACKAGE=$1
STAGE="dev"
shift

# PRE DEBUG
npm run build:shared
cd packages/$PACKAGE

rm -rf logs
npm run build

# DEBUG
export SLS_DEBUG=*
node --inspect /home/joaquin/.nvm/versions/node/v21.7.1/bin/serverless offline start --stage $STAGE