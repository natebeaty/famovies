import Alpine from 'alpinejs';
import zenscroll from 'zenscroll';
import appState from './appState';
import common from '../routes/common';

const filteredEntries = {
  init() {
    let entriesWrap = document.querySelector('.entries-wrap');
    let entriesPerPage = entriesWrap.getAttribute('data-entries-per-page');

    // Alpine bootstrap
    document.addEventListener('alpine:init', () => {
      Alpine.data('entries', () => ({
        entries: [],
        tags: [],
        filters: {
          tag: [],
          search: '',
        },
        itemsPerPage: entriesPerPage,
        currentPage: 0,
        selectedTag(event, tag) {
          // If holding meta key, or tag is already selected, do nothing (allow normal checkbox behavior to select multiple or deselect)
          if (!event.metaKey && this.filters.tag[0] != tag) {
            event.preventDefault();
            this.filters.tag = [ tag ];
          }
        },
        isFiltering() {
          return this.filters.tag.length || this.filters.search !=='';
        },
        clearFilters() {
          this.filters = {
            tag: [],
            search: '',
          };
        },
        panToResults() {
          if (!appState.isAnimating) {
            setTimeout(function() {
              common.scrollElementIntoView(entriesWrap);
            }, 250);
          }
        },
        numPages() {
          return Math.ceil(this.filteredEntries.length / this.itemsPerPage)
        },
        page() {
          return this.filteredEntries.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)
        },
        setPage(page) {
          if (page != this.currentPage) {
            this.currentPage = page;
            this.panToResults();
          }
        },
        async getData() {
          // Retrieve entry + tag data from backend
          let data = await (await fetch('/entries.json')).json();

          // Hide server-rendered elements that we're going to replicate with Alpine
          document.querySelectorAll('[x-remove]').forEach(e => e.remove())

          this.entries = data.entries;
          this.tags = data.tags;
        },
        get filteredEntries() {
          // Filter entries based on current search + selected filters
          const filtered = this.entries.filter(item => {
            if (this.filters.tag.length && item.tags.filter(x => this.filters.tag.indexOf(x) !== -1).length === 0) {
              return false;
            }
            if (this.filters.search !== '' && item.title.toLowerCase().indexOf(common.escapeHtml(this.filters.search.toLowerCase())) === -1) {
              return false;
            }
            return true;
          });
          return filtered;
        },
        setFromParams() {
          // Get URL params
          let params = common.getParams();
          // Set filter vars from params on init
          this.filters.tag = params['tag[]'] ? (params['tag[]'].constructor===Array ? params['tag[]'] : [params['tag[]']]) : [];
          this.filters.search = params['q'] || '';
          this.currentPage = params['pg'] ? params['pg'] - 1 : 0;
        },
        init() {
          // Set vars from URL params
          this.setFromParams();

          // Get stories json data of stories + tags
          this.getData();

          // Watch for filter changes
          this.$watch('filters', (value) => {
            // Reset page
            this.currentPage = 0;

            // Update URL based on filters
            if (!this.isFiltering()) {
              // No filters, return to URL without any query params
              history.replaceState(null, null, window.location.pathname);
            } else {
              const url = new URL(window.location.href);
              if (this.filters.search) {
                url.searchParams.set('q', this.filters.search);
              } else {
                url.searchParams.delete('q');
              }
              if (this.filters.tag.length) {
                this.filters.tag.forEach((val, i) => {
                  if (i === 0) {
                    url.searchParams.set('tag[]', val);
                  } else {
                    url.searchParams.append('tag[]', val);
                  }
                });
              } else {
                url.searchParams.delete('tag[]');
              }
              history.replaceState(null, document.title, url.toString());
            }
          });

          // Watch for currentPage changes
          this.$watch('currentPage', (value) => {
            const url = new URL(window.location.href);
            if (this.currentPage) {
              url.searchParams.set('pg', this.currentPage + 1);
            } else {
              url.searchParams.delete('pg');
            }
            history.replaceState(null, null, url.toString());
          });
        }
      }));
    });

    // Init Alpine
    Alpine.start();
  },
};

export default filteredEntries
