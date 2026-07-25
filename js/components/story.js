import { stories } from "../data/dummy.js";

export function StorySection(){

return`

<section class="story-section">

${stories.map(story=>`

<div class="story">

<img src="${story.avatar}">

<span>${story.name}</span>

</div>

`).join("")}

</section>

`;

}