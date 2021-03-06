import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import  { RouteLocationNormalizedLoaded } from 'vue-router';
import {store} from 'src/store';

export interface ITagView extends Partial<RouteLocationNormalizedLoaded> {
  title?: string;
  name?: any;
}

export interface ITagsViewState {
  visitedViews: ITagView[];
}
const name = 'tagsView';
@Module({ dynamic: true, store, name})
class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = [];
  public cachedViews: (string | undefined)[] = [];

  @Mutation
  private ADD_VISITED_VIEW(view: ITagView) {
    if (
      this.visitedViews.some((v) => {
        return v.path === view.path;
      })
    ) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name',
      }),
    );
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    // keep affix tags
    const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix);
    this.visitedViews = affixTags;
    console.log(this.visitedViews)
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: ITagView) {
    for (const [i,v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        // v = Object.assign(v, view);
        this.visitedViews[i] = view
        break;
      }
    }
    console.log(this.visitedViews)
  }
  @Mutation
  private DEL_VISITED_VIEW(view: ITagView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
      }
    }
  }

  @Mutation
  private UPDATE_ALL(views: ITagView[]) {
    this.visitedViews = views
  }

  @Action
  public addView(view: ITagView) {
    this.ADD_VISITED_VIEW(view);
  }
  @Action
  public delView(view: ITagView) {
    this.DEL_VISITED_VIEW(view);
  }

  @Action
  public delAllViews() {
    this.DEL_ALL_VISITED_VIEWS();
  }

  @Action
  public updateVisitedView(view: ITagView) {
    this.UPDATE_VISITED_VIEW(view);
  }

  @Action
  public updateAll(views: ITagView[]) {
    this.UPDATE_ALL(views)
  }
}
export const TagsViewModule = getModule(TagsView);
