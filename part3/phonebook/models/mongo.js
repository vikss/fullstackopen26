import mongoose from "mongoose"




const url = process.env.MONGODB_URI
//const url = ;
console.log("The url is ", url);

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Entry = mongoose.model("Entry", entrySchema);
if (process.argv.length < 5) {
  Entry.find({}).then(result=>{
    console.log("phonebook:")
    result.forEach(entry=>console.log(entry.name, entry.number))
    mongoose.connection.close()
   
  })



} else {
  const phonebookEntry = { name: process.argv[3], number: process.argv[4] };

  const phoneEntry = new Entry(phonebookEntry);

  phoneEntry.save().then((result) => {
    console.log(
      `added the entry ${result.name} ${result.number} to the phonebook`
    );
    mongoose.connection.close();
  });
}
entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const EntryModel = mongoose.model("Entry", entrySchema)
export default {EntryModel}