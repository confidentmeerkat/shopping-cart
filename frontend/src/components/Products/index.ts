import { compose } from 'recompose';
import { connect } from 'react-redux';
import { initCatalog, clearFilters, setSortBy } from '@actions/index';
import { isCatalogLoaded, sortProducts, filterProducts, selectSortBy } from '@selectors/catalog';
import { IState } from '@typings/state/index';
import Products, { Props } from './Products';

const mapStateToProps = (state: IState) => ({
  catalogLoaded: isCatalogLoaded(state),
  catalog: sortProducts(filterProducts(state), state.sortBy),
  sortBy: selectSortBy(state)
});

const actions = {
  initCatalog,
  clearFilters,
  setSortBy
};

export default compose<Props, {}>(
  connect(mapStateToProps, actions)
)(Products);
