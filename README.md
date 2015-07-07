# Grocery List Checker

Prototype URL: http://pocg.ct-gr.com

Branch: [master](https://github.com/pocg/hackathon/tree/master)

In June 2015, the Government published a Request for Quotation (RFQ) to establish multiple award Blanket Purchase Agreements for the General Service Administration’s (GSA) 18F, a fee-drive organization that designs, builds, and operates user-centric digital services and provides consulting services. The RFQ challenged companies to design and develop a working prototype using datasets from the Food and Drug Administration (FDA).

Phase One Consulting Group (Phase One) formed a [multi-disciplinary team](https://github.com/pocg/hackathon/blob/master/POCG%20Team.docx) to address the challenge and to design and develop the working prototype. Richie Stockholm served as the team’s Product Owner and was responsible for directing the team’s efforts and managed the effort timeline as he ensured the prototype’s quality from the ideation stage through its final delivery. The team consisted of members with a broad range of skill sets including a design team whose members focused on interacting with end users and creating a prototype that met their needs and expectations and a development team whose members focused on developing the prototype using Agile  methodologies. The full team is listed below:

* Richie Stockholm – Product Manager/Owner, Technical Architect, Interaction Designer/ User Researcher/ Usability Tester
* Casey Linsey –  Business Analyst and Writer/ Content Designer/ Content Strategist
* Collin Klamper – Delivery Manager
*	Donn Escario – Visual Designer
*	Julia Shevchenko – DevOps Engineer
*	Rory Bell – Frontend Developer
*	Stan Ascher – Frontend Developer
*	Eric Maxwell – Backend Developer
*	Matt Russell – Agile Coach

## Prototype Specifics
The prototype chosen was a Grocery List checker. A solution which consumes FDA data regarding food recalls via its open API and displays the data in a meaningful way for users on all devices using a responsive design, the Grocery List Checker allows users to enter items on their grocery list to see which items may be under a recall. This rather simple app is built on Node.js and uses SASS to control styling. Several other technologies were used in development of this prototype and include:
* Bower
* Gulp
* AngularJS
* Express
* NPM
* Grunt
* MongoDB
* Linux
* Karma
* Jasmine

The prototype is deployed in Amazon Web Services and is continously monitored using Uptime Robot. All technologies we selected are open-source or freely licensed. [Instructions for installation](https://github.com/pocg/hackathon/blob/master/installation%20instructions) are provided in this repository.

## Design Approach
The design team was tasked with identifying and providing developers with information necessary to develop a solution from the available datasets. In order to ensure the solution identified and defined was driven by users and that the design process participatory, interactive, and collaborative, the team employed a user-centered approach to identify challenges and opportunities, define features users need and expect in the initial solution, and determine which features users would like in future iterations. The team employed user-centered design techniques.

During an [initial internal discussion](https://github.com/pocg/hackathon/blob/master/Pictures/Initial%20Strategy.JPG), the team selected citizens rather than businesses or other Agencies as the target for our prototype. From the initial decision, two brainstorming sessions were conducted in order to identify various user problems and potential solutions which the datasets and additional information would help resolve. The results of the brainstorming sessions were [four idea wireframes](https://github.com/pocg/hackathon/blob/master/design/ADS%20Hackathon%20Wireframes%20.pptx): 

1.	Drug Company Report Card
2.	Food Recalls by Company and Location
3.	Drug Adverse Effects Checker
4.	Grocery List Checker

Prelminary wireframes were used in a survey – presented in an [online questionnaire](https://docs.google.com/forms/d/1OqXY2OYnjwkj86WQj8yTvqA7r4BKy02fzPD1QPpMjvU/viewform) – used to identify which of the four solutions users needed and wanted most. We had [108 people respond](https://docs.google.com/forms/d/1OqXY2OYnjwkj86WQj8yTvqA7r4BKy02fzPD1QPpMjvU/viewanalytics) to the questionnaire, and the majority requested the development of the grocery list checker.

With the prototype identified, the design team developed [personas](https://github.com/pocg/hackathon/blob/master/design/GSA%20Hackathon%20Personas.pptx) to identify and define overarching user groups the solution would serve. The personas served as the foundation of the initial user stories. Following the development of personas, the design team conducted a [focus group](https://github.com/pocg/hackathon/blob/master/Pictures/IMG_3190.JPG) to define the [features users needed](https://github.com/pocg/hackathon/blob/master/design/Focus%20Group%20Notes.png) and expected in the initial solution and to determine which features users would like in future iterations. The results of the focus group were compiled and analyzed to develop [updated mockups](https://github.com/pocg/hackathon/blob/master/design/18F_AGILE_GroceryListChecker_6%2025%2015.pptx) of the solution which were provided to the development team along with a design [style guide](https://github.com/pocg/hackathon/blob/master/design/2_styleguide.docx). 

User Acceptance Testing (UAT) was conducted after the development team finalized the second sprint of development to ensure the solution met user needs and to capture additional feedback for the third sprint of development. Results of UAT were compiled and incorporated into final mockups and the [issue log](https://github.com/pocg/hackathon/issues) for tracking.

## Development Approach
The development team's number one priority was to ship a functional prototype. In order to ensure the solution employed an iterative approach which incorporated feedback from user interactions, the development team used Agile methodologies. Developers had daily check-ins with the Product Owner to address any blockers and to confirm understanding of the design. Matt Russell provided guidance on creating the backlog based on the design. The [GitHub Issues](https://github.com/pocg/hackathon/issues) feature was used to track that backlog.

## Conclusion
The working prototype designed and developed for this effort is an initial app which allows the public to check the food items they have purchased or plan to purchase against the FDA’s dataset of food recalls. However, the prototype is basic in functionality and only reflects the initial idea. Additional iterations would bring many more functions as identified by users which will allow the public to use the app as a daily tool. Those functions include
* choosing grocery items from a pick list
* Per-populate the grocery list based on previous shopping trips
* Display healthier substitutes
* Integrate social media information
* Proivde links to related news articles and other media attention

