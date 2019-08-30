import { h } from "preact";
import style from "./style";

const Home = () => (
  <div class={style.home}>
    <div class={style.about}>
      <div class={style.imageContainer}>
        <img class={style.image} src="/assets/profile.jpg" />
      </div>
      <div class={style.quote}>
        <div class={style.details}>
          Jane presents traditional spanish art with a modern twist. Her work is
          excellent quality, her technique is brilliant and her love of the
          subject matter shines through.
        </div>
        <div class={style.author}>- The Local Newspaper</div>
      </div>
    </div>
  </div>
);

export default Home;
