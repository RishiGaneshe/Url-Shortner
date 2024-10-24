const BloomFilter = require('bloom-filter').BloomFilter;



// const bloomFilter = new BloomFilter({
//     size: 1000000, // Size of the Bloom filter (1 million)
//     numHashes: 5,  // Number of hash functions
// });


exports.checkShortId= async(shortId)=>{
   try{
       if (bloomFilter.has(shortUrl)) {
           const urlEntry = await Url.findOne({ shortUrl });
           return urlEntry !== null; 
       }
       return false    
   }catch(err){
       console.log(`Error in the Bloom Filter Service ${err}`)
   }
}