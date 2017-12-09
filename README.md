
# JS Test Boilerplate

> 
1. Introduction
2. Download
3. Installation
3. Settings
4. Tools
5. Commands available
6. Typical workflow (TDD)
7. Reference
8. License 

## Introduction

**JavaScript Test Boilerplate** is a project setup ready to start your tests for your JavaScript developments.

## Download

Download the compressed folder through GitHub, or type in your terminal:

    ~$ git clone ${THIS_URL}
    
## Installation

#### 1. Install dependencies

Place the command line inside the (already uncompressed) folder.

Then, to install all local dependencies:

    ~$ npm install

Then you'll probably miss some globally installed tools that is using our `Gruntfile.js`. 

#### 2. Install global commands (required)

Specifically, we need *Grunt* to manage our tasks, *Karma* to manage our unit tests, *PhatomJS* and *CasperJS* to manage our end-to-end tests, and *JSHint* to avoid errors in our code.

So you can run also:

    ~$ sudo npm install -g grunt
    ~$ sudo npm install -g karma
    ~$ sudo npm install -g phantomjs
    ~$ sudo npm install -g casperjs
    ~$ sudo npm install -g jshint
    
With these in your system, you won't have any missing tool available in your terminal.

## Settings

#### Unit testing settings

The **unit tests** are fired with:

    ~$ grunt testunit

This command is configured from the Karma settings file, at:
- `test/karma.unit.conf.js`, and 
- `Gruntfile.js`.

> By default, the included files in the unit tests are:
- `src/public/js/**/*.js` 
- `test/unit/**/*.spec.js`.


#### End-to-end testing settings

The **end-to-end tests** are fired with:

	~$ grunt testend
This command is configured from the `Gruntfile`, and the `CasperJS` instance running directly. 

> By default, the included files in the e2e tests are:
- `test/e2e/**/*.espec.js`
- (The example shows how to inject jQuery from local)

  
## Tools

The tools used in this project have different purposes.

The tools used for **unit testing** are:

- Karma
- Mocha (sync and async tests)
- Chai (behaviour testing)
- Sinon (mocks) 
- ...

The tools used to **end-to-end testing** are:

- PhantomJS (automatizable browser)
- CasperJS (extension)
- External client-side libraries (jQuery, for example)
- ...

And all these tools are orchestrated from:

- NPM
- Grunt

## Commands available

Starts a static server that serves the app:

    ~$ grunt start

Opens the application in a browser:

    ~$ grunt open

Runs unit tests with Karma ( + Mocha + Chai + Sinon):

    ~$ grunt testunit

Runs end-to-end tests with CasperJS ( + PhantomJS):

    ~$ grunt testend

Generates the documentation (with a little but effective script that uses JavaScript regular expressions to extract all substrings that match *JavaDoc comments notation* but in a wide acceptance of parameters):

    ~$ grunt generatedocs

## Typical workflow (TDD)

When using this project, one can adapt its workflow to any situation.

However, the typical workflow that I would recommend would be:

#### Step 1: Start a new feature
	
	1. Create a new branch for a new feature.
	2. Add a `test/e2e/{task.name}.espec.js` file.
	3. Add a comment in that file specifying the new required feature.
	4. Push changes to the branch.

#### Step 2: Specify the new feature (from user perspective)
	1. Write the end-to-end test in the `*.espec.js` file (CasperJS).
	2. Let it fail.
	3. Push changes to the branch.

#### Step 3: Specify the new feature (from developer perspective)
	1. Add a `test/unit/{task.name}.spec.js` file.
	2. Write the unit-test in the `*.spec.js` file (Mocha + Chai + Sinon).
	3. Let it fail.
	4. Push changes to the branch.

#### Step 4: Resolve tests (both, e2e and unit tests)
	1. Make the changes needed for the tests to pass.
	2. Push changes to the branch.

#### Step 5: Merge branch
	1. Merge changes with the original branch.

#### Step 6: Finish feature
	1. Remove feature/branch from repository.


## Reference

#### a) Unit tests

Unit tests are located at `test/unit/*` folder.
Unit tests are expected to be files ended with `*.spec.js`.
By default, all files under `src/public/js/*` ending with `*.js` are loaded the unit tests too.

You can find an example of unit test in the sample application that comes with the package.

#### b) End-to-end tests

End-to-end tests are located at `test/e2e/*` folder.
End-to-end tests are expected to be files ended with `*.espec.js` (the extra 'e' is from 'end').

You can find an example of end-to-end test in the sample application that comes with the package.

#### c) Documents

Documentation is generated with a simple script that you can see in the `Gruntfile.js`. 
All the documentation will come from comments that follow this structure:

    /**
     * Some info for description
     * Some info for description
     * Some info for description
     * @key Value value value value value
     * value value value value
     * @key2 Value2 value2 value2 value2
     * value2 value2 value2 value2
     */`. 

Empty lines in JavaDoc are **not** allowed (only ` * ` would be considered empty line).
Also, the documentation is right now served in a JSON format. 
I hope this will change soon.

## License

Do what you feel like.