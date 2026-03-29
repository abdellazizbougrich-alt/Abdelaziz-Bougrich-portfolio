from rembg import remove
from PIL import Image

input_path = 'assets/images/profile-placeholder.jpeg'
output_path = 'assets/images/profile-transparent.png'

print("Opening image...", flush=True)
try:
    with open(input_path, 'rb') as i:
        with open(output_path, 'wb') as o:
            input_val = i.read()
            print("Removing background with rembg...", flush=True)
            output_val = remove(input_val)
            print("Saving image...", flush=True)
            o.write(output_val)
    print("Background removed successfully!", flush=True)
except Exception as e:
    print(f"Error occurred: {e}", flush=True)
