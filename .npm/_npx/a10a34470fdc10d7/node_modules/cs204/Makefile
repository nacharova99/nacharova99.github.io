res: doc/check204.pdf  bin/check204.js


bin/check204.js: src/main.nw 
	notangle -Rcheck204.js src/main.nw > bin/check204.js




doc/check204.pdf: src/check204.tex  tmp/main.tex
	pdflatex -output-directory=doc src/check204.tex
	pdflatex -output-directory=doc src/check204.tex

# Утилита noweave генерирует файл main.tex из отдельных файлов 
# формата noweb.
tmp/main.tex: src/main.nw  src/Makefile.nw
	noweave -n -latex -index -autodefs c  src/main.nw \
	       	src/Makefile.nw > tmp/main.tex

# Эту команду выполняем в случае, если были изменения в файле 
#Makefile.nw, notangle генерирует новый Makefile

new: src/Makefile.nw
	notangle -t8 -RMakefile src/Makefile.nw > Makefile


view:
	evince doc/check204.pdf &
	
clean:
	rm doc/check204.pdf bin/check204 tmp/main.tex 

