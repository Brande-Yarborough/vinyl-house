from rest_framework import permissions

# custom permissions


class IsUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # if doing get request, return true
        # if request.method in permissions.SAFE_METHODS:  # get is safe method
        #     return True
        # if author is equal to person making request, this will evaluate to true(allows author who created comment to edit and delete)
        # if not true, returns false and request does not go through
        return obj.user == request.user


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # if doing get request, return true
        # if request.method in permissions.SAFE_METHODS:  # get is safe method
        #     return True
        # if author is equal to person making request, this will evaluate to true(allows author who created comment to edit and delete)
        # if not true, returns false and request does not go through
        return obj.author == request.user
