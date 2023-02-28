#!/bin/bash
if [ ! -f "db.json" ]; then
  echo '{
    "expenses": []
  }' > db.json
fi