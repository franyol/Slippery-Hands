from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import threading
import functools
import subprocess
import os

command = 'bash scripts/dev.sh'

# Store the current subprocess
current_process = None

def devouncer(func, delay=1):
    # Using functools.wraps to preserve the original function signature
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if hasattr(wrapper, '_timer'):
            wrapper._timer.cancel()
        wrapper._timer = threading.Timer(delay, func, args=args, kwargs=kwargs)
        wrapper._timer.start()

    return wrapper

# Function to create and kill subprocess
def run_subprocess():
    global current_process

    # If a subprocess is already running, terminate it
    if current_process and current_process.poll() is None:
        print("Terminating the existing process...")
        current_process.terminate()  # Gracefully terminate the process
        current_process.wait()  # Wait for the process to fully terminate

    # Create a new subprocess
    print("Starting new process...")
    current_process = subprocess.Popen(command, shell=True)

# Apply debouncer to the subprocess function
debounced_run_subprocess = devouncer(run_subprocess)

# Define a handler class
class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return
        print(f'{event.src_path} has been modified.')
        debounced_run_subprocess()  # Call the debounced subprocess function

    def on_created(self, event):
        if event.is_directory:
            return
        print(f'{event.src_path} has been created.')
        debounced_run_subprocess()  # Call the debounced subprocess function

    def on_deleted(self, event):
        if event.is_directory:
            return
        print(f'{event.src_path} has been deleted.')

    def on_moved(self, event):
        if event.is_directory:
            return
        print(f'{event.src_path} has been moved to {event.dest_path}.')

# List of directories to watch
directories_to_watch = [
    "src",
    "static",
    "templates"
]

# Set up the observer
event_handler = MyHandler()
observer = Observer()

# Schedule observer for each directory in the list
for directory in directories_to_watch:
    observer.schedule(event_handler, directory, recursive=True)

# Start the observer
observer.start()
run_subprocess()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()

observer.join()
