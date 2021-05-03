const {Octokit} = require("octokit")
const dotenv = require("dotenv")
const {Client} = require("@notion/client");
dotenv.config();

const octokit = new Octokit({auth: process.env.GITHUB_KEY})
const notion = new Client({auth:process.env.NOTION_KEY}); 

const database_id = process.env.NOTION_DATABASE_ID; 

(async function main() {
    console.log("Running main function"); 
    
    //Get all issues currently in the database and save them
    issues_in_database = {}
    await getIssuesFromDatabase(issues_in_database, null);

    console.log(issues_in_database)

    //Get all GitHub Issues from a Repo
    var gitHubIssues = {}; 
    const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
        owner: process.env.GITHUB_REPO_OWNER,
        repo:process.env.GITHUB_REPO_NAME, 
        per_page: 100
    }); 

    for await (const {data: issues} of iterator) {
        for (const issue of issues) {
            gitHubIssues[issue.number] = {
                "id": issue.id, 
                "title": issue.title, 
                "state": issue.state,
                "comments": issue.comments, 
            }
        }
    }

    //Create new issues or update existing in a Notion Database
    for await (const [key,value] of Object.entries(gitHubIssues)){
        const issue_number = key 
        const issues_details = value
        //If the issue does not exist in the database yet, add it to the database
        if(!(issue_number in issues_in_database)){
            const response = await notion.request({
                path:'pages', 
                method:"POST", 
                body:{
                    "parent": { "database_id": database_id},
                    "properties": {
                        "State": {"name": issues_details.state},
                        "Issue Number": parseInt(issue_number),
                        "Name": [ { "text": {"content" : issues_details.title} } ],
                        "Comments": parseInt(issues_details.comments)
                    }
                }
            })
        } else 
        //This issue already exists in the database so we want to update the page
        {
            await notion.request({
                path:'pages/'+issues_in_database[issue_number].page_id,
                method:'patch', 
                body:{
                    "properties": {
                        "State": {"name": issues_details.state},
                        "Issue Number": parseInt(issue_number),
                        "Name": [ { "text": {"content" : issues_details.title} } ],
                        "Comments": parseInt(issues_details.comments) 
                    }
                }
            })
        }
    }
    //Run this function every hour
    setTimeout(main, 5*1000)
})();

//Get a paginated list of Issues currently in a the database. 
async function getIssuesFromDatabase(issues, start_cursor = null) {
    var request_payload = "";
    //Create the request payload based on the presense of a start_cursor
    if(start_cursor == null){
        request_payload = {
            path:'databases/' + database_id + '/query', 
            method:'POST',
        }
    } else {
        request_payload= {
            path:'databases/' + database_id + '/query', 
            method:'POST',
            body:{
                "start_cursor": start_cursor
            }
        }
    }
    //While there are more pages left in the query, get pages from the database. 
    const current_pages = await notion.request(request_payload).then(async function(response){ 
        for(const page of response.results){
            issues_in_database[page.properties["Issue Number"].number] = {
                "page_id": page.id, 
            }
        }
        if(response.has_more){
            await getIssuesFromDatabase(issues, response.next_cursor)
        }
    })
}; 
