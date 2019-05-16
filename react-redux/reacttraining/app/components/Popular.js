import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

const languages = [
  'All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'
]

const SelectLanguage = (props) => (
  <ul className="languages">
    {languages.map((language) => {
      return (
        <li
          className={
            language === props.selectedLanguage ?
              'active' : ''
          }
          onClick={props.onSelect.bind(null, language)}
          key={language}>
          {language}
        </li>
      )
    })}
  </ul>
)
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const RepoGrid = (props) => (
  <ul className="popular-list">
    {props.repos.map((repo, index) => (
      <li key={repo.name} className="popular-item">
        <div className="popular-rank">#{index + 1}</div>
        <ul className="space-list-items">
          <li>
            <img className="avatar" src={repo.owner.avatar_url}
              alt={'Avatar for ' + repo.owner.login}
            />
          </li>
          <li><a href={repo.html_url}>{repo.name}</a></li>
          <li>@{repo.owner.login}</li>
          <li>{repo.stargazers_count} stars</li>
        </ul>
      </li>
    ))}
  </ul>
)
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: []
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: []
    });

    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState({ repos })
      });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {this.state.repos.length === 0
          ? <Loading />
          : <RepoGrid repos={this.state.repos}/>
        }
      </div>
    )
  }
}