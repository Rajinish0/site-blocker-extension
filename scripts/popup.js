//this is for the html of the extension
//so when the full html is loaded only then i do these stuff
document.addEventListener('DOMContentLoaded', () => {
	const siteList = document.getElementById('site-list');
	const siteInp = document.getElementById('site-inp');
	const addButton = document.getElementById('addButton');

	function updateUI(blockedSites) {
		siteList.innerHTML = '';
		blockedSites.forEach( (site, index) => {
			let li = document.createElement('li');
			li.textContent = site;
			let remButton = document.createElement('button');
			remButton.setAttribute('id', 'rem-button');
			remButton.textContent = 'Remove';
			remButton.addEventListener('click', () => {
				blockedSites.splice(index, 1); //remove the thing
				chrome.storage.sync.set( {blockedSites}, () => updateUI(blockedSites) ) //probably should make a resuable func for this
			})
			li.appendChild(remButton);
			siteList.appendChild(li);
			console.log(site);
		})
		console.log(blockedSites);
	}

	/*
	{blockedSites} or 
	(result) => {
	let blockedSites = result.blockedSites;
	}
	*/
	chrome.storage.sync.get('blockedSites', ({ blockedSites }) => {
		blockedSites = blockedSites || [];
		updateUI(blockedSites);		
	})

	addButton.addEventListener('click', () => {
		const newSite = siteInp.value.trim();
		if (newSite){
		chrome.storage.sync.get('blockedSites', ({ blockedSites}) => {
			blockedSites = blockedSites || [];
			blockedSites.push(newSite);
			chrome.storage.sync.set( {blockedSites} ).then( () => {
				siteInp.value = siteInp.getAttribute('placeholder');
				updateUI(blockedSites);
			})
			})
		}
	}
	)

})
