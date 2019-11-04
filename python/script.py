import json
import re

import requests
import bs4

output_filename = '../games.json'

url = "https://www.top-league.jp/schedule/convention/5961/"
res = requests.get(url)
soup = bs4.BeautifulSoup(res.content, "html.parser")

games = []
round_cnt = 1
for games_table in soup.find_all('table', class_="games"):
    for game in games_table.select('tr'):
        teams = []
        for team in game.find_all('div', class_="team"):
            teams.append(team.find('span', class_="name").text)
        weekday = game.find('span', class_="wd").text
        game = {
            "round": round_cnt,
            "date": game.find('span', class_="date").text,
            "weekday": weekday.replace('(', '').replace(')', ''),
            "kickoff": game.find('span', class_="kickoff").text,
            "stadium": game.find('td', class_="site").text,
            "team1": teams[0],
            "team2": teams[1]
        }
        games.append(game)
    round_cnt += 1

with open(output_filename, 'w') as f:
    json.dump(games, f, ensure_ascii=False, indent=2)
