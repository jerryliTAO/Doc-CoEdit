import { connect } from 'mongoose';

const connectDB = () => {
    try {
        //force to String
        const uri = process.env.DB_CONNECTION || '';
        console.log(uri)
        connect(uri);
        console.log("MongoDB connect successful!")
    } catch (error) {
        console.log('MongoDB connection failed.', error)
        process.exit(1)
    }
}

export { connectDB };

