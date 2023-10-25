# Query QL Application

## Demo : https://drive.google.com/file/d/1saR9owubPY-PRlmHXKil2bkp7NUD8uiD/view?usp=sharing

## Problem Statement

The Query QL Application aims to simplify the process of searching for the most relevant results using similarity search in Weaviate's vector store. While Weaviate offers the ability to query the vector store using GraphQL, it can be challenging for programmers and clients with no prior knowledge of GraphQL. This application provides an easier way to query the vector store, obtain similarity results, and further refine and summarize those results using OpenAI's natural language processing capabilities.

### Key Features

- **Simplified Querying**: With the Query QL Application, you can perform searches in the Weaviate vector store without needing in-depth knowledge of GraphQL.

- **Limit Results**: You have the option to limit the number of results retrieved, ensuring you only receive the most relevant information.

- **Summarization with OpenAI**: The application leverages OpenAI's capabilities to summarize the raw query results. You can use prompts to obtain concise and easily digestible summaries of the data.

## What is Weaviate?

**Weaviate** is an open-source vector database designed for efficient and effective retrieval of data objects based on their semantic properties. It achieves this by indexing data objects with vectors, allowing for similarity-based searches.

- **Semantic Search**: Weaviate's core principle is to enable searches based on the similarity of data objects in vector space. If data or documents are similar in meaning, their vectors will be close to each other in the vector space. This makes Weaviate particularly powerful for searching and retrieving semantically related data.

- **GraphQL-API**: Weaviate provides a GraphQL-API, which makes it easy to interact with and retrieve data objects based on their vectors. The Query QL Application utilizes this API to simplify the query process.

## What is Similarity Search?

At the heart of the Query QL Application and Weaviate is the concept of **similarity search**. Here's how it works:

- **Vector Embeddings**: Data, including text data, is represented as vectors (mathematical representations). These vectors capture the semantic properties of the data.

- **Similarity by Proximity**: In the vector space, similar data points (vectors) are close to each other, while dissimilar ones are farther apart. By indexing both queries and documents with vector embeddings, you can efficiently find similar documents as the nearest neighbors of your query.

- **Semantic Understanding**: This approach is highly effective for finding data with similar meaning. Data with shared concepts and context will be plotted closely in the vector space, making it an excellent choice for semantically driven searches.

## OpenAI Integration

The Query QL Application enhances the search experience by integrating **OpenAI**. OpenAI is a cutting-edge natural language processing technology that can summarize and manipulate text data. Here's how it is used:

- **Summarization**: OpenAI is employed to summarize the raw query results. By using prompts, you can obtain concise and easy-to-understand summaries of the search results.

- **Further Manipulations**: Beyond summarization, OpenAI can be utilized for various other data manipulations. For instance, you can translate the results, present them in tabular format, or apply other transformations to achieve the desired output format.

By combining Weaviate's similarity search with OpenAI's natural language processing capabilities, the Query QL Application provides a powerful solution for obtaining relevant information from the vector store.

### Architectural diagram 

![image](https://github.com/fAwkes1101/QueryQI/assets/142393903/0bedfadc-f035-4ca5-b8e8-ccd4002a2488)


### Application Structure

The Query QL Application is a web-based tool built using React, JavaScript, and external APIs. It consists of three primary files: `App.js`, `openai.js`, and `weaviate.js`. Here's a brief overview of each file's role:

#### `App.js`

- **Functionality**: This is the main application file responsible for handling user interactions and data flow.

- **User Interface**: It defines the user interface (UI) for the application, including the chat interface and settings.

- **Key Features**:
  - **Message Handling**: Manages user messages and bot responses.
  - **Querying Weaviate**: Sends queries to the Weaviate vector store and retrieves results.
  - **OpenAI Integration**: Uses OpenAI for text summarization and manipulations.
  - **User Interface**: Defines the chat interface and settings for the application.

#### `openai.js`

- **Functionality**: This file encapsulates interactions with the OpenAI API for text completions and summarization.

- **Key Features**:
  - **Communication with OpenAI**: Communicates with the OpenAI API to send messages and receive completions.
  - **Message Summarization**: Utilizes OpenAI to summarize and manipulate text data.

#### `weaviate.js`

- **Functionality**: Handles interactions with the Weaviate vector database and GraphQL queries.

- **Key Features**:
  - **Weaviate Client Configuration**: Configures and creates a client to interact with the Weaviate instance.
  - **Schema and Class Definitions**: Retrieves class and property definitions from Weaviate's schema.
  - **Query Execution**: Sends GraphQL queries to Weaviate and retrieves results based on the user's input.

### Using the Application

To use the Query QL Application effectively, follow these steps:

1. **Installation and Setup**:
   - Make sure you have Node.js and npm (Node Package Manager) installed.
   - Install the necessary dependencies by running `npm install` in the application directory.

2. **Configuration**:
   - You must set environment variables for your Weaviate and OpenAI API keys. Ensure that these variables are correctly defined in your environment.

3. **Running the Application**:
   - Start the application by running `npm start` in the application directory.
   - The application will run in your web browser at the specified port.

4. **Application Interface**:
   - The application's interface is divided into two main sections:
     - **Sidebar**: Contains the application's logo, a button for starting a new chat, a pre-defined query button, and settings for limiting the number of results and toggling between raw and processed responses.
     - **Main Chat Window**: Displays chat messages between the user and the application. You can send messages, view bot responses, and see summaries.

5. **Starting a New Chat**:
   - Click the "New Chat" button to clear the current chat and start a new conversation.

6. **Sending a Query**:
   - In the input field at the bottom, type your query and press "Enter" or click the "Send" button.
   - The application will display your query and send it to Weaviate for processing.
   - The result, either raw or processed, will be shown in the chat window.

7. **Limiting Results and Summarization**:
   - Use the "Limit" slider to control the number of results to retrieve from Weaviate.
   - Toggle the "Raw" switch to choose between raw Weaviate results and processed results using OpenAI's text summarization.

8. **Pre-defined Queries**:
   - The application offers a set of pre-defined queries that you can quickly select for experimentation.

### Extending the Application

You can further extend the application by:

- Adding more pre-defined queries to facilitate common use cases.
- Enhancing the user interface for a better user experience.
- Customizing OpenAI prompt generation for more advanced manipulations of query results.
- Adding features like exporting results in different formats or translations.

Happy querying and exploring with the Query QL Application!
