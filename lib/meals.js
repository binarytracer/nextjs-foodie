import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "ap-southeast-2",
});

const db = sql("meals.db");

export async function getMeals() {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  //   throw new Error("Loading meals failed");
  return db.prepare("SELECT * from meals").all();
}

export function getMeal(slug) {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals where slug = ? ").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject(
    {
      Bucket: "rod-nextjs-foodie-images-v2",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type,
    },
    function (error, data) {
      if (error) {
        console.log("Error", error);
        return;
      }
      console.log(data);
    }
  );

  meal.image = fileName;

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, image, slug, creator, creator_email) 
    VALUES (@title, @summary, @instructions, @image, @slug, @creator, @creator_email)`
  ).run(meal);
}
