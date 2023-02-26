import { Component } from '@angular/core';

@Component({
  selector: 'app-mygarden',
  template:  `
  <h1 class="title mx-5">My Garden</h1>
  <!-- <h2 class="subtitle">
     Add Plants to My Garden
  </h2> -->
  <p class="mx-5">Search our plant database by name:</p>
<section>
<div class="field is-grouped mx-5 mb-5">
  <p class="control">
    <input class="input" type="text" placeholder="Find a repository">
  </p>
  <p class="control">
    <a class="button is-success">
      Search
    </a>
  </p>
</div>
<div>
<table class="table is-fullwidth is-hoverable mx-5">
  <thead>
    <tr>
      <th>Name</th>
      <th>Temperature</th>
      <th>PH</th>
      <th>Soil</th>
      <th>Waterlevel</th>
      <th>Space</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Raddish</td>
      <td>31</td>
      <td>6.5</td>
      <td>Well-drained Sandy Soil</td>
      <td>High</td>
      <td>0.025</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>Beet</td>
      <td>29</td>
      <td>6.8</td>
      <td>Well-drained Carbonic Soil</td>
      <td>High</td>
      <td>0.025</td>
    </tr>
  </tbody>
</table>
</div>
  `,
  styles: [
  ]
})
export class MygardenComponent {

}
