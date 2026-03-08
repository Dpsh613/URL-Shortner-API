import express from "express";
import { urlModel } from "../model/shortUrl.js"; // deconstructed model so we can read and write in it with ease.. give short example on how if we didnt deconstruced it , would call its value.

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("the fullUrl is", req.body.fullUrl); // whats exactly req.body ?
    const { fullUrl } = req.body; // deconstructed full Url ? umm okay but reason ?
    const urlFound = await urlModel.find({ fullUrl }); // ?? how exactly we are searching url fullUrl with this ?
    if (urlFound.length > 0) {
      // easily understandable logic.. skip
      res.status(409); // error meaning ?
      res.send(urlFound); // okay , if it exist send this as response ..
    } else {
      const shortUrl = await urlModel.create({ fullUrl }); // its just creating shorturl and in value its full url ? bcs its the target that the user creating shortUrl ?
      res.status(201).send(shortUrl); // okay understandable
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" }); // 500 - internal server error ?
  }
};

// this function is clear. skip
// btw when we use req? once we did it above . req body ? other ? keep it brief .
export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find();
    if (shortUrls.length === 0) {
      res.status(404).send({ message: "short Urls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};
// yes i got the logic.
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    // FIX 1: Create a variable and cast it to string
    const shortId = req.params.id as string;

    // FIX 2: Use findOneAndUpdate. 
    // $inc: { clicks: 1 } automatically adds 1 to clicks in the database.
    // { new: true } returns the updated document.
    const shortUrl = await urlModel.findOneAndUpdate(
      { shortUrl: shortId },
      { $inc: { clicks: 1 } },
      { new: true } 
    );

    if (!shortUrl) {
      res.status(404).send({ message: "Full Url not found" });
    } else {
      // No need for .save() here anymore!
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};
// okay too.. also this find/findOne/find and delete comes inbuilt with express ?
export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(200).send({ message: "Requested URL successfully deleted" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};
