export default class RiaApi {
  constructor() {
    this.url = "https://developers.ria.com/auto/";
    this.apiKey = "CSZCqn3KA6mjPoYwZtA3AgQBaDa3PJ7ga9fjODMH";
  }

  async fetchModel(markID) {
    try {
      const response = await fetch(
        `${this.url}categories/1/marks/${markID}/models?api_key=${this.apiKey}`
      );
      if (!response.ok && response.status === 404) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError || error instanceof Error) {
        return { error: error };
      } else {
        return error;
      }
    }
  }

  async fetchAds(filter) {
    let params =
      "category_id=1&bodystyle[0]=2&bodystyle[1]=4&currency=1&countpage=5";
    params += filter.price_from
      ? `&price_ot=${filter.price_from}`
      : `&price_ot=0`;
    params += filter.price_to ? `&price_do=${filter.price_to}` : "";
    filter.cars.map((auto, key) => {
      params += `&marka_id[${key}]=${auto.markID}`;
      params += `&model_id[${key}]=${auto.modelID}`;

      return params;
    });

    if (filter.states.length) {
      filter.states.map(
        (state, keyState) =>
          (params += `&state[${keyState}]=${state[1]}&city[${keyState}]=0`)
      );
    }

    try {
      const response = await fetch(
        `${this.url}search?${params}&api_key=${this.apiKey}`
      );
      if (!response.ok && response.status === 404) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError || error instanceof Error) {
        return { error: error };
      } else {
        return error;
      }
    }
  }

  async fetchDetailInfo(id) {
    try {
      const response = await fetch(
        `${this.url}info?auto_id=${id}&api_key=${this.apiKey}`
      );
      if (!response.ok && response.status === 404) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError || error instanceof Error) {
        return { error: error };
      } else {
        return error;
      }
    }
  }
}
