import {Client} from '@elastic/elasticsearch'

const esClient = new Client({
    node : process.env.ES_URL ||  'http://localhost:9200' ,
})



export const runElasticClient = async () => {
    try {
      const info = await esClient.info();
      if(info)
        console.log('Elasticsearch connected Successfully');
    } catch (error) {
      console.error('Elasticsearch connection error:', error);
    }
  };


export default esClient