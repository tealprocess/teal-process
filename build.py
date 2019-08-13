import os

for filename in os.listdir("views"):
	if filename.endswith(".html"):
		new_home = "public/" + os.path.splitext(filename)[0]
		if not os.path.exists(new_home):
			os.makedirs(new_home)
		old_filename = "views/"+filename
		print(old_filename)
		with open(old_filename, "r") as orig_file:
			info = orig_file.read()

			new_filename = new_home+"/index.html"
			print(new_filename)
			with open(new_filename, "w") as new_file:
				new_file.write(info)
	else:
		continue