import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIA42PHHLIFS64LDIGK", // Reemplaza con tu Access Key
  secretAccessKey: "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", // Reemplaza con tu Secret Key
  region: "us-east-2", // Reemplaza con la región de tu bucket (por ejemplo, "us-east-1")
});

export default s3;