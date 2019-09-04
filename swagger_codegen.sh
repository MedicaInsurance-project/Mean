rm -r swagger_output/html/*
rm -r swagger_output/objc/*
rm -r swagger_output/js/*
swagger-codegen generate -i definitions/* -l dynamic-html -o swagger_output/html/
swagger-codegen generate -i definitions/* -l nodejs-server -o swagger_output/js/
swagger-codegen generate -i definitions/* -l objc -o swagger_output/objc/
printf "\n\n * Done!\n\n * Node.js stubs can be found in swagger_output/js/controllers/ for reference, but they haven't been automatically merged into your service project. Please copy over any new function call stubs that you might need into the main project files, particularly anything new that matches swagger_output/js/controllers/*Service.js"
printf "\n\n * Also, note that right now we also need to take the definition yaml generated in swagger_output/js/api and use that to feed the middleware, or else copy over the operationId and x-swagger-router-controller for now, until this can be scripted or something"
printf "\n\n * ObjC stubs for your function calls can be found in swagger_output/objc/\n\n * Generated documentation and tester forms are in swagger_output/html/ (TODO - a script to automatically deploy these when an environment's branch, like DEV, is updated)\n\n"
