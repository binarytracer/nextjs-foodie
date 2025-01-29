import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

// dynamic metadata generation
export async function generateMetadata(props) {
  const { params } = props;

  const { summary, title } = getMeal(params.mealSlug);

  if (!title) {
    return notFound();
  }

  return {
    title,
    description: summary,
  };
}

export default function MealDetailsPage(props) {
  const { params } = props;

  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound(); // will render the closest not found page handler
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            fill
            src={`https://rod-nextjs-foodie-images-v2.s3.ap-southeast-2.amazonaws.com/${meal.image}`}
            alt={meal.title}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}> {meal.summary} </p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
