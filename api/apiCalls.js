import axios from "axios";

// gamemode: 1 - 1vs1, 5 - FFA, 6 - 2v2AT, 8 - 4v4AT
const GAME_MODE = 1; // 1vs1
const PAGE_SIZE = 0; // all matches
// gateway: 20 - europe
const GATEWAY = 20; // Europe

const client = axios.create({
  baseURL: "https://website-backend.w3champions.com/api"
});

export const fetchPlayerData = async (player, season) => {
  try {
    const { data } = await client.get(
      `/players/${player.name}%23${player.id}/game-mode-stats?gateWay=${GATEWAY}&season=${season}`
    );
    return data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

export const fetchPlayerMatches = async (player, season) => {
  try {
    const { data } = await client.get(
      `/matches/search?playerId=${player.name}%23${player.id}&season=${season}&gameMode=${GAME_MODE}&offset=0&pageSize=${PAGE_SIZE}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchPlayerMmrHistory = async (player, season) => {
  try {
    const { data } = await client.get(
      `/players/${player.name}%23${player.id}/mmr-rp-timeline?race=${player.race}&gateWay=20&season=${season}&gameMode=${GAME_MODE}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchCurrentSeasonNumber = async () => {
  try {
    const { data } = await client.get(
      "https://website-backend.w3champions.com/api/ladder/seasons"
    );
    if (data) {
      return data[0].id;
    }
    return 0;
  } catch (error) {
    console.log(error);
    return {};
  }
};
