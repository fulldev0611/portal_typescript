#!/usr/bin/env bash

# Start the supervisor deamon
supervisord -c /etc/supervisor/supervisord.conf --nodaemon & SUPERVISOR_PID=$!
# Wait for the supervisord to complete
wait "${SUPERVISOR_PID}"