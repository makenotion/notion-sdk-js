const {Client} = require("@notion/client")
const dotenv = require("dotenv")
const sgMail = require('@sendgrid/mail')
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY)
const notion = new Client({auth:process.env.NOTION_KEY}); 

const database_id = process.env.NOTION_DATABASE_ID; 

//A JSON Object to hold all tasks in the Notion database
tasks_in_database = {};

(async function init(){

    //Start by loading the current state of the Notion database. 
    await getTasksFromDatabase(tasks_in_database, null)

})().then( async function main(){
    console.log("Main Function Running")

    //Get all tasks in the database
    const curr_tasks_in_database = {}
    await getTasksFromDatabase(curr_tasks_in_database, null)
    
    for await (const [key,value] of Object.entries(curr_tasks_in_database)){
        const page_id = key; 
        const curr_status = value.Status;
        //console.log(curr_status) 
        //If this task hasn't been seen before
        if(!(page_id) in tasks_in_database){
            //Add this task to the local store of all tasks
            tasks_in_database[page_id] = {
                "Status": curr_status
            }; 
        } else {
            if(curr_status != tasks_in_database[page_id].Status){
                tasks_in_database[page_id] = {
                    "Status": curr_status
                }
                const msg = {
                    to:process.env.EMAIL_TO_FIELD, 
                    from:process.env.EMAIL_FROM_FIELD, 
                    subject:'Notion Task Status Updated', 
                    text:"A Notion task's: " + value.Title + " status has been updated to " + curr_status + "."
                }
                sgMail.send(msg).then(() => {
                    console.log("Email Sent")
                }).catch((error) => {
                    console.error(error)
                })
                console.log("Status Changed")
            } 
        }
    }
    setTimeout(main, 5000)
}); 

//Get a paginated list of Tasks currently in a the database. 
async function getTasksFromDatabase(tasks, start_cursor = null) {
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
            if(page.properties.Status){ 
                tasks[page.id] = {
                    "Status": page.properties.Status.select.name,
                    "Title": page.properties.Name.title[0].text.content
                }
            } else {
                tasks[page.id] = {
                    "Status": "No Status",
                    "Title": page.properties.Name.title[0].text.content
                }
            }
        }
        if(response.has_more){
            await getTasksFromDatabase(tasks, response.next_cursor)
        }
    })
}; 
