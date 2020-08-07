# Root Coding Exercise

### Primary Technology Used

- Node v14.6.0 is used on this application (other versions are not guaranteed)

### Running the application locally:

This application was built using Node version v14.6.0. It may work on different versions, however it has only been tested on v14.6.0. Consider using nvm (node version manager) and switching to this version to ensure the application runs as expected.

- Ensure correct Node version
- Clone this repository into a directory of your choosing
- Navigate to the root directory of the repository and install dependencies
  - npm install

- Run the application by providing raw input data via standard in.  In the example below, replace "src/sample_data/sample_data.txt" with your own text or text file
```
cat src/sample_data/sample_data.txt | node src/index.js
```

### Useful Commands

Install Dependencies

```
npm install
```

Run / Watch All Tests

```
npm run test
npm run test:watch
```

### Key Notes:

Generally speaking, I approached this problem in three phases and the general structure of the application reflects it as such.  There is the parsing phase, the calculation phase, and the reporting phase.  This much separation could be overkill for the stated problem, however I wanted to be deliberate about separated behaviors such as data fetching, transformation, and display.

For the parsing phase, I did introduce a few additional parsing considerations to minimize some of the possible error cases (extra spaces, tabs, etc).  This was not called out, but I wanted to at least introduce the fact that the source data cannot always be trusted.  Additionally, the file will repond with an error show any commands exist in the file outside the scope of the assignment (Driver and Trip are the only acceptable values)

I tried to isolate business logic in the calculation phase (service directory).  Essentially, the aggregation and averaging of driver data lives here.  Additionally, the parsed data is shaped here into objects more representative of the business case being solved.

Finally, the reporter directory houses the report builder which is essentially the view layer.  In this section, the business domain objects that were created from the calculation phase are put to work.  Formatting occurs in this layer to tailor the report output to the business specifications.

Additionally, I did try to focus on avoiding data mutations.  You'll find the application is primarly functionally programmed in nature.  I tried not to overcomplicate matters too much with lots of design patterns, but instead focused more in minimizing side-effects when possible.  Testing patterns reflect the benefits of solving this functionally as well.  Most tests I've implemented check for behavior, not implemention and focus on input/output of pure functions.  This allows for a bit more flexibility when refactoring since the underlying implementation can change.
