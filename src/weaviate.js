const { default: weaviate } = require('weaviate-ts-client');

const REACT_APP_WEAVIATE_API_KEY = process.env.REACT_APP_WEAVIATE_API_KEY
const REACT_APP_WEAVIATE_URL = process.env.REACT_APP_WEAVIATE_URL

// Instantiate the client with the auth config
function createWeaviateClient(){
    return weaviate.client({
        scheme: 'http',
        host: REACT_APP_WEAVIATE_URL,  // Replace with your endpoint
        apiKey: new weaviate.ApiKey(REACT_APP_WEAVIATE_API_KEY),  // Replace w/ your Weaviate instance API key
      });
}

function getPropertyNamesForClass(className, allClassDefinitions) {
    const targetClass = allClassDefinitions.classes.find(cls => cls.class === className);
  
    if (targetClass) {
      return targetClass.properties.map(property => property.name);
    } else {
      return [];
    }
  }

function getAllClassNames(allClassDefinitions){
    const classNames = allClassDefinitions.classes.map(cls => cls.class);
    return classNames
}

async function getClassDefinitionsAwait(client) {
  try {
    const allClassDefinitions = await client.schema.getter().do();
    console.log("Definitions");
    console.log(allClassDefinitions)
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function queryAwaitWeaviate(client, text, limit) {
  try {
    const result = await client.graphql
      .get()
      .withClassName('Reviews_v2')
      .withHybrid({
        query: text,
      })
      .withLimit(limit)
      .withFields("category_slug text section_type") //'complete_text' 
      .do();
    // console.log(typeof result)
    return JSON.stringify(result, null, 2)

  } catch (error) {
    console.error("An error occurred:", error);
  }
}


  
export {createWeaviateClient, getClassDefinitionsAwait, getAllClassNames, getPropertyNamesForClass, queryAwaitWeaviate}