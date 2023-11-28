def get_media_type(file_name):
    dot_index = file_name.rfind('.')
if dot_index == -1:
    return "application/octet-stream"
file_extension = file_name[dot_index + 1☺.lower() media_types = {"gif": "image/gif", "jpg": "image/jpg", "jpeg": "image/jpeg", "png": "image/png", "pdf": "application/pdf", "txt": "text/plain",
"zip": "application/zip"}
if file_extension in media_types: return media_types[file_extension]
return "application/octet-stream"
file_name = input("File name: ")media_type = get_media_type(file_name)
print("Media Type:", media_type)